import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
};

export default Page;
