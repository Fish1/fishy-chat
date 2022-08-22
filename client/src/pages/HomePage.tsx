import { useNavigate } from "@solidjs/router";
import { Component, createSignal } from "solid-js";

const HomePage: Component = () => {
  const navigate = useNavigate();

  if (localStorage.getItem('userName') !== null) {
    navigate('/chat');
  }

  const [ userName, setUserName ] = createSignal('');

  function handleOnUserNameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setUserName(target.value);
  }

  function handleLogin(event: Event) {
    event.preventDefault();
    localStorage.setItem('userName', userName());
    navigate('/chat');
  }

  return (
    <div class="flex justify-center h-screen items-center">
      <form
        onSubmit={handleLogin}
        class="flex flex-row flex-shrink border-2 m-5 rounded-md"
      >
        <div
          class="flex flex-col flex-grow gap-2" 
        >
          <input
            type="text"
            class="p-5 focus:outline-none rounded-md"
            placeholder="Username"
            minLength={6}
            onChange={handleOnUserNameChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          class="border-l-2 px-5 hover:bg-slate-200 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default HomePage;