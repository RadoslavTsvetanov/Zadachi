import type { pageProps } from "../_app";
import React, { useEffect } from "react";

const HomePage: React.FC<pageProps> = ({ ctx }) => {
  useEffect(() => {
    console.log(ctx.cookies.auth.getCookie());
  }, []);

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button
        onClick={() => {
          ctx.setLoading(true);
          setTimeout(() => {
            ctx.setLoading(false);
            ctx.setError(false);
          }, 5000);
        }}
      >
        hihihi
      </button>
    </div>
  );
};

export default HomePage;
