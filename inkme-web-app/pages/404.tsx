import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mt-20 flex flex-col w-full items-center ">
      <h1 className="heading1">
        <p className="inline font-bold text-5xl">404</p> Page not Found
      </h1>
      <Link href="/">back to Home</Link>
    </div>
  );
}
