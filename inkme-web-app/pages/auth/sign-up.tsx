import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import app from "../../firebase";
import { useEffect, useState } from "react";

interface SignUpData {
  username: string;
  password: string;
  isArtist: boolean;
}

const SignUpPage = () => {
  const auth = app.auth();
  const { query, push } = useRouter();
  const [error, setError] = useState<string>();
  const { code } = query;
  const { register, handleSubmit } = useForm<SignUpData>({
    defaultValues: {
      username: "julian-blaschke",
      password: "asdöflkjö",
      isArtist: false,
    },
  });

  useEffect(() => {
    console.log(auth.currentUser);
    if (auth.currentUser) push("/");
  }, []);

  //for development only:
  const createUser = app.functions().httpsCallable("createUser");
  const onSubmit = async ({ username, isArtist, password }: SignUpData) => {
    try {
      const { data } = await createUser({ code, username, isArtist, password });
      const { token } = data;
      await auth.signInWithCustomToken(token);
      push("/");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <div className="mt-10 p-6 flex flex-col items-center">
      <Head>
        <title>Sign up - ink.me</title>
        <meta
          name="description"
          content="Sign up and become part of the ink.me community"
        />
      </Head>
      <div className="w-full sm:max-w-md">
        <span className="text-gray-500 font-light">Almost done!</span>
        <h1 className="font-semibold text-4xl">Finish your Sign up</h1>
        <form className="mt-10 grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="label pb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input"
              placeholder="my-username-21"
              autoComplete="nickname"
              ref={register()}
              required
              minLength={3}
              maxLength={25}
            />
          </div>
          <div>
            <label htmlFor="password" className="label pb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="password1234"
              autoComplete="new-password"
              ref={register()}
              required
              minLength={5}
              maxLength={40}
            />
          </div>
          <div>
            <div className="flex flex-row justify-between items-center">
              <label className="label inline pb-1" htmlFor="isArtist">
                I am a Tattoo Artist
              </label>
              <input
                id="isArtist"
                name="isArtist"
                type="checkbox"
                className="checkbox"
                ref={register()}
              />
            </div>
            <p className="text-gray-500 text-sm font-light">
              This is important: Your ink.me experience depends on wheter you
              are an artist or a potential customer. There will be no way to
              later on change your preference!
            </p>
          </div>
          <button type="submit" className="button">
            Sign up
          </button>
          <span className="text-sm text-red-500 text-center">{error}</span>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
