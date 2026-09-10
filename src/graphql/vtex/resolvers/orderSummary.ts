import { UnauthorizedError } from "@faststore/api";

// This resolver returns data that belongs to one shopper, so it must be
// authenticated as that shopper rather than as the store. It never uses an
// appKey/appToken pair: it forwards the shopper's own cookies, and the OMS
// endpoint returns only the orders that belong to whoever is signed in.
// Refer to https://developers.vtex.com/docs/guides/faststore/api-extensions-authentication-in-api-extensions

type ResolverContext = {
  account: string;
  headers: Record<string, string | undefined>;
  clients: {
    commerce: {
      vtexid: { validate: () => Promise<{ authStatus?: string }> };
    };
  };
};

type UserOrdersResponse = {
  list?: Array<{ creationDate?: string }>;
  paging?: { total?: number };
};

// Throws unless the incoming request carries a valid shopper token.
const requireAuthenticatedShopper = async (ctx: ResolverContext) => {
  try {
    const validation = await ctx.clients.commerce.vtexid.validate();

    if (validation?.authStatus?.toLowerCase() !== "success") {
      throw new UnauthorizedError("Authentication required");
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }

    // For a missing or expired token, VTEX ID answers 401 and the client
    // throws instead of resolving. Without this catch, the caller would get
    // a 500 rather than a 401.
    throw new UnauthorizedError("Authentication required");
  }
};

const orderSummaryResolver = {
  Query: {
    orderSummary: async (_: never, __: never, ctx: ResolverContext) => {
      await requireAuthenticatedShopper(ctx);

      // Only the most recent order is needed: `paging.total` carries the count.
      const searchParams = new URLSearchParams({
        per_page: "1",
        orderBy: "creationDate,desc",
      });

      const response = await fetch(
        `https://${ctx.account}.vtexcommercestable.com.br/api/oms/user/orders?${searchParams}`,
        {
          headers: {
            "content-type": "application/json",
            // Forwarding the shopper's cookies is what scopes the response.
            cookie: ctx.headers?.cookie ?? "",
          },
        }
      );

      if (!response.ok) {
        // The status is logged, never returned: an upstream error body may
        // carry headers or internal URLs.
        console.error("Order summary request failed", {
          status: response.status,
        });

        throw new Error("Could not load the order summary");
      }

      const orders: UserOrdersResponse = await response.json();

      return {
        totalOrders: orders.paging?.total ?? 0,
        lastOrderDate: orders.list?.[0]?.creationDate ?? null,
      };
    },
  },
};

export default orderSummaryResolver;
