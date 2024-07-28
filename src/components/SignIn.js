import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignIn() {
  const [userArray, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    // Define an async function to fetch data
    const fetchUsers = async () => {
      try {
        // Send a GET request to your endpoint
        const response = await axios.get("http://localhost:3001/api/users");

        // Update state with the fetched data
        setUsers(response.data);

        // Log fetched users
        console.log("Fetched users:", response.data);
      } catch (err) {
        // Handle any errors
        console.log("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  const HandleSignIn = (event) => {
    event.preventDefault();
    console.log(userArray);
    const user = userArray.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log(
        "User is loggedin with email",
        user.email,
        "Password",
        user.password
      );
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user)
      alert(`Welcome, ${user.name}! You have successfully signed in.`);
      navigate(`/`);
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      <p class="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
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
