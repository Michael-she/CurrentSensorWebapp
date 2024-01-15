/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4D9dRtuQt1c
 */
import { Button } from "@/components/ui/button"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <div key="1" className="flex w-full min-h-screen">
      <nav className="flex flex-col items-start gap-6 text-lg font-medium h-screen border-r p-4 md:p-6 md:text-sm lg:gap-6 bg-gray-200 dark:bg-gray-800">
        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <Button className="self-start" size="sm" variant="ghost">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <span className="sr-only">Collapse</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-6">
            <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
              <LayoutDashboardIcon className="w-6 h-6" />
              Dashboard
            </Link>
            <Link className="font-bold" href="#">
              <UserIcon className="w-6 h-6" />
              Account Management
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              <LayoutDashboardIcon className="w-6 h-6" />
              Dashboard
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              <PlusIcon className="w-6 h-6" />
              Add a Current Sensor
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              <UsersIcon className="w-6 h-6" />
              Manage Groups
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <ArrowRightIcon className="w-4 h-4 absolute left-0 top-1/2 transform -translate-y-1/2" />
      </nav>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="bg-red-100 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sensor ID: 12345</CardTitle>
              <RadarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">24.5A</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last reading: 10 seconds ago</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sensor ID: 12346</CardTitle>
              <RadarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">30.12A</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last reading: 20 seconds ago</p>
            </CardContent>
          </Card>
          <Card className="bg-red-100 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sensor ID: 12347</CardTitle>
              <RadarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">21.5A</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last reading: 30 seconds ago</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sensor ID: 12348</CardTitle>
              <RadarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">18.5A</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last reading: 40 seconds ago</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function LayoutDashboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function RadarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <path d="M12 18h.01" />
      <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
      <circle cx="12" cy="12" r="2" />
      <path d="m13.41 10.59 5.66-5.66" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
