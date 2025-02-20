export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          SpaceJam Network is the unlimited rust implementation of the JAM
          protocol.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          What is SpaceJam?
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          SpaceJam is a decentralized network protocol implemented in Rust,
          designed to provide unlimited scalability and interoperability for
          blockchain applications.
        </p>
        <div className="my-6 w-full overflow-y-auto">
          <div className="flex min-w-max gap-4">
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">Open Source</h3>
              <p className="text-sm text-muted-foreground">
                Built with transparency and community collaboration in mind.
              </p>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">Rust-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Leveraging Rust's performance and safety guarantees.
              </p>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">Unlimited Scalability</h3>
              <p className="text-sm text-muted-foreground">
                Designed to handle massive network growth without compromising
                speed.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Key Features
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>High-performance Rust implementation</li>
          <li>Cross-chain compatibility</li>
          <li>Advanced security features</li>
          <li>Developer-friendly APIs</li>
          <li>Comprehensive documentation</li>
        </ul>
      </div>
    </div>
  );
}
