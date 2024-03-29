"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


  
interface Users {
    id: number;
    name: string;
    slug: string;
    description?: string;
}


export default function Home() {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://einstaklingsveff-production.up.railway.app/users');
      const users = await response.json();
      setUsers(users);
    }
    fetchData()
  }, []);

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Select a user to view history</h2>
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {users.map((user) => (
              <SelectItem
                key={user.id}
                value={user.name}
                onClick={() => handleUserSelect(user.name)}
              >
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className={cn("mt-4")}>
        <Link href={`/history?user=${selectedUser}`}>View History</Link>
      </Button>
    </div>
  );
}
