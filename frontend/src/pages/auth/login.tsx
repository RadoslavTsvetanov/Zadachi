
export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
          username: formData.get('username'),
          email: formData.get('email'),
          password: formData.get('password'),
        };
        console.log('Form Data:', data);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Signup Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label" htmlFor="username">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
}