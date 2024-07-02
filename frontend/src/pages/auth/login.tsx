import { pageProps } from "../_app";

const Login: React.FC<pageProps> = ({ ctx }) => {
  return (
    <div>
      <button
        onClick={() => {
          ctx.cookies.auth.setCookie("test");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
