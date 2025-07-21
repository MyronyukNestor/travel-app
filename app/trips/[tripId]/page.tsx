import { auth } from "@/auth";
import TripDetailClient from "@/components/TripDetailClient";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const TripDetail = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;

  const session = await auth();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign In.
      </div>
    );
  }
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
  });

  if (!trip) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen text-gray-700 text-xl">
        <h2>Trip Not Found.</h2>
        <Link href="/trips">
          <Button>Back to Trips</Button>
        </Link>
      </div>
    );
  }

  return <TripDetailClient trip={trip} />;
};

export default TripDetail;
