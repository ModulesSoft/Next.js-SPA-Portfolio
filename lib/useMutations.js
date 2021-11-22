import useSWR from "swr";

export default function useMutations(user,fetchFunction) {
  // We do authorization needed requests here
  const { data: mutations } = useSWR([user?.authToken],fetchFunction);

  return { mutations };
}