import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const userArray = [
    {
      name: "Alice Johnson",
      role: "Admin",
      email: "alice@example.com",
      id: "1",
      department: "IT",
      password: "12345678"
    },
    {
      name: "Bob Smith",
      role: "IT Person",
      email: "bob@example.com",
      id: "2",
      department: "IT",
      password: "12345678"
    },
    {
      name: "Carol White",
      role: "Employee",
      email: "carol@example.com",
      id: "3",
      department: "HR",
      password: "12345678"
    },
    {
      name: "Dave Brown",
      role: "Admin",
      email: "dave@example.com",
      id: "4",
      department: "Finance",
      password: "12345678"
    },
    {
      name: "Eve Davis",
      role: "IT Person",
      email: "eve@example.com",
      id: "5",
      department: "IT",
      password: "12345678"
    },
    {
      name: "Frank Miller",
      role: "Employee",
      email: "frank@example.com",
      id: "6",
      department: "Marketing",
      password: "12345678"
    },
  ];
  const HandleSignIn = (event) => {
    event.preventDefault();
    const user = userArray.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("User is logged in", user.email, email, user.password, password);
      navigate(`/user/${user.id}`);
    } else {
      console.log("Invalid email or password");
    }
  };
  return (
    <div className="App">
      <div class="h-full bg-white">
        <div class="h-full">
          <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                class="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label
                    for="email"
                   
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div class="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={(e)=>setEmail(e.target.value)}
                      autocomplete="email"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div class="text-sm">
                      <p
                        
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e)=>setPassword(e.target.value)}
                      autocomplete="current-password"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={HandleSignIn}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
