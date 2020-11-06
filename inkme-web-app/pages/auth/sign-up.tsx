import Head from "next/head";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

type Step = "basic" | "username" | "facebook";
type BasicSignUpData = { email: string; password: string; isArtist: boolean };
type SignUpData = BasicSignUpData & { username: string };
type SignUpState = { step: Step; data: Partial<SignUpData> };
const defaultState: SignUpState = { step: "basic", data: {} };
const SignUpContext = createContext<{
  state: SignUpState;
  dispatch: Dispatch<Action>;
}>({ state: defaultState, dispatch: (e) => null });
type Action =
  | { type: "next"; step: Step }
  | { type: "setData"; data: Partial<SignUpData> };

const reducer = (state: SignUpState, action: Action): SignUpState => {
  switch (action.type) {
    case "next":
      return { ...state, step: action.step };
    case "setData":
      return { ...state, data: { ...state.data, ...action.data } };
    default:
      return state;
  }
};

const EmailAndPasswordForm = () => {
  const { state, dispatch } = useContext(SignUpContext);
  const { register, handleSubmit } = useForm<{ email: string }>({
    defaultValues: state.data,
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const onSubmit = (values: BasicSignUpData) => {
    dispatch({ type: "setData", data: values });
    dispatch({ type: "next", step: "username" });
  };

  //focus email field on page load
  useEffect(() => emailRef.current?.focus(), []);
  console.log("rerender");

  return (
    <>
      <h1 className="font-semibold text-4xl">Create your account!</h1>
      <form
        className="mt-20 flex flex-col space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="label pb-1" htmlFor="email">
            Email
          </label>
          <input
            required
            autoComplete="email"
            className="input"
            id="email"
            name="email"
            type="email"
            placeholder="sample@email.com"
            ref={(e) => {
              register(e);
              emailRef.current = e;
            }}
          />
        </div>
        <div>
          <label className="label pb-1" htmlFor="password">
            Password
          </label>
          <input
            required
            autoComplete="current-password"
            minLength={6}
            maxLength={20}
            className="input"
            name="password"
            id="password"
            type="password"
            placeholder="Password1234"
            ref={register()}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <label className="label inline pb-1" htmlFor="isArtist">
            I am a Tattoo Artist
          </label>
          <input
            className="checkbox"
            onChange={(e) =>
              dispatch({
                type: "setData",
                data: { isArtist: e.target.checked },
              })
            }
            id="isArtist"
            type="checkbox"
            name="isArtist"
            ref={register()}
          />
        </div>
        <button className="button text-primary" type="submit">
          Next
        </button>
      </form>
    </>
  );
};

const ChooseUsernameForm = () => {
  const { state, dispatch } = useContext(SignUpContext);
  const [username, setUsername] = useState<string>(state.data.username || "");
  const onSubmit = () => {
    dispatch({ type: "setData", data: { username } });
    if (state.data.isArtist) {
      dispatch({ type: "next", step: "facebook" });
    }
    //TODO: redirect to dashboard and give intro
  };
  return (
    <>
      <h1 className="font-semibold text-4xl">Choose your username</h1>
      <div className="mt-20 flex flex-col space-y-6">
        <div>
          <label className="label pb-1" htmlFor="email">
            Username
          </label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={20}
            autoComplete="username"
            className="input"
            id="username"
            name="username"
            type="username"
            placeholder="your-username-21"
          />
          {state.data.isArtist ? (
            <p className="mt-2 text-gray-500 text-sm font-light">
              You should use your artists name you are known for in the
              industry. It makes you easier to find for customers that already
              know you by that name.
            </p>
          ) : null}
        </div>
        <button className="button text-primary" onClick={onSubmit}>
          Next
        </button>
        <a
          className="text-center text-secondary cursor-pointer"
          onClick={() => dispatch({ type: "next", step: "basic" })}
        >
          Go Back
        </a>
      </div>
    </>
  );
};

const ConnectToFacebook = () => {
  const { dispatch } = useContext(SignUpContext);
  return (
    <>
      <h1 className="font-semibold text-4xl">Link with Instagram</h1>
      <div className="flex flex-col space-y-6">
        <p className="mt-2 text-gray-500 text-sm font-light">
          We noticed that tatoo artists like to share their work on Instagram.
          To include your insta feed on your ink.me profile you can link your
          Facebook Profile (that is connected to your Instagram-Account) with
          your ink.me Profile.
        </p>
        <div className="flex flex-row justify-between space-x-4 md:flex-col md:space-x-0 md:space-y-4">
          <button className="button text-primary">Connect to Facebook</button>
          <button className="button text-primary bg-primary border-2 border-primary">
            Finish
          </button>
        </div>
        <a
          className="text-center text-secondary cursor-pointer"
          onClick={() => dispatch({ type: "next", step: "username" })}
        >
          Go Back
        </a>
      </div>
    </>
  );
};

const SignUpPage = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const stepNr = useMemo(() => {
    switch (state.step) {
      case "basic":
        return 1;
      case "username":
        return 2;
      case "facebook":
        return 3;
    }
  }, [state.step]);
  const totalSteps = useMemo(() => (state.data.isArtist ? 3 : 2), [
    state.data.isArtist,
  ]);

  return (
    <SignUpContext.Provider value={{ state, dispatch }}>
      <Head>
        <title>Sign up - ink.me</title>
        <meta
          name="description"
          content="Sign up and become part of the ink.me community"
        />
        <meta name="" />
      </Head>
      <div className="mt-10 p-6 flex flex-col items-center">
        <div className="w-full sm:max-w-md">
          <span className="text-gray-500 font-light">
            Step {stepNr} of {totalSteps}
          </span>
          {state.step === "basic" ? (
            <EmailAndPasswordForm></EmailAndPasswordForm>
          ) : state.step === "username" ? (
            <ChooseUsernameForm></ChooseUsernameForm>
          ) : (
            <ConnectToFacebook></ConnectToFacebook>
          )}
        </div>
      </div>
    </SignUpContext.Provider>
  );
};

export default SignUpPage;
