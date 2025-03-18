import ProcterContextProvider from "@/contexts/ProcterContextProvider";
import VolumeLevelProvider from "@/contexts/VolumeLevelProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProcterContextProvider>
      <div id="test-container" />
      <VolumeLevelProvider>{children}</VolumeLevelProvider>
    </ProcterContextProvider>
  );
}
