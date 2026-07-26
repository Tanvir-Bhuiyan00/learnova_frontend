import PublicHeader from "@/components/modules/PublicHeader";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}
