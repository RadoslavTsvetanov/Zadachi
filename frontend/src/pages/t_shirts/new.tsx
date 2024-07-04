import type { pageProps } from "../_app";
import React, { useEffect, useState } from "react";

const HomePage: React.FC<pageProps> = ({ ctx }) => {
  const [user, setUser] = useState<null | { user: string }>();
  useEffect(() => {
    console.log(ctx.cookies.auth.getCookie());

    const fetch_data = async () => {
      const res = await ctx.api.get();
      console.log("lolo", res);

      if (ctx.isResponseNotOk(res.status)) {
        ctx.setError(JSON.stringify(res.err));
      }

      setUser(res.data);
    };

    console.log("kokoko");
    fetch_data();

    console.log("kokoko");
  }, [ctx]);

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button
        onClick={() => {
          ctx.setLoading(true);
          setTimeout(() => {
            ctx.setLoading(false);
            ctx.setError("something went wrong");
          }, 5000);
        }}
      >
        hihihi
      </button>
    </div>
  );
};

export default HomePage;
