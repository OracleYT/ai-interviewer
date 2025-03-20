import VolumeLevelProvider from "@/contexts/VolumeLevelProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <VolumeLevelProvider>{children}</VolumeLevelProvider>
    </>
  );
}
