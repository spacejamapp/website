import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-page flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-6 text-6xl font-bold tracking-tighter">SpaceJam</h1>
        <p className="mb-8 max-w-[600px] text-xl text-muted-foreground">
          The universal implementation of the JAM protocol.
        </p>
        <div className="flex gap-4">
          {/*   <Button size="lg" asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">Documentation</Link>
          </Button> */}
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Decentralized Infrastructure</CardTitle>
              <CardDescription>
                Build and deploy your applications on our robust decentralized
                network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experience high availability, fault tolerance, and seamless
                scalability with our distributed infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Web3 Integration</CardTitle>
              <CardDescription>
                Seamlessly integrate blockchain technology into your
                applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support for multiple chains, smart contracts, and decentralized
                storage solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Developer Tools</CardTitle>
              <CardDescription>
                Comprehensive toolkit for Web3 development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access SDKs, APIs, and documentation to accelerate your
                development process.
              </p>
            </CardContent>
          </Card>
        </div>
      </section> */}
    </main>
  );
}
