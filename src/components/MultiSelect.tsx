"use client"

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { User } from "@/types";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { UseFormSetValue } from "react-hook-form";
import { TGroupSchema } from "@/lib/zod/validators"

interface MultiSelectProps {
   users: User[]
   selected: User[]
   setSelected: Dispatch<SetStateAction<User[]>>
   setValue: UseFormSetValue<TGroupSchema>
}

const MultiSelect = ({ users, selected, setSelected }: MultiSelectProps) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [open, setOpen] = useState(false);
   const [inputValue, setInputValue] = useState("");

   const handleUnselect = useCallback((user: User) => {
      setSelected((prev) => prev?.filter((s) => s.id !== user.id));
   }, [setSelected]);

   const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;

      if (input) {
         if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
               setSelected((prev) => {
                  const newSelected = [...prev];
                  newSelected.pop();
                  return newSelected;
               });
            }
         }

         if (e.key === "Escape") {
            input.blur();
         }
      }
   }, [setSelected])

   const selectables = useMemo(() => {
      return users.filter((user) => !selected?.includes(user))
   }, [users, selected])

   return (
      <Command onKeyDown={handleKeyDown} className="overflow-visible">
         <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex flex-wrap gap-1">
               {selected?.map((user) => {
                  return (
                     <Badge key={user.id} variant="secondary">
                        {user.name}
                        <button
                           className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                           onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                 handleUnselect(user);
                              }
                           }}
                           onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                           }}
                           onClick={() => handleUnselect(user)}
                        >
                           <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                     </Badge>
                  );
               })}
               {/* Avoid having the "Search" Icon */}
               <CommandPrimitive.Input
                  ref={inputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onBlur={() => setOpen(false)}
                  onFocus={() => setOpen(true)}
                  placeholder="Select... (backspace or delete to remove user)"
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
               />
            </div>
         </div>
         {open && selectables.length > 0 && (
            <div className="relative mt-2">
               <CommandList className="absolute top-0 z-10 w-full max-h-[106px] md:max-h-[202px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                  <div>
                     <CommandGroup>
                        {selectables.map((user) => {
                           return (
                              <CommandItem
                                 key={user.id}
                                 onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                 }}
                                 onSelect={() => {
                                    setInputValue("");
                                    setSelected((prev) => [...prev, user]);
                                 }}
                                 className="cursor-pointer my-1"
                              >
                                 <ProfilePicture
                                    className="size-6" 
                                    user={user}
                                    showStatus={false} 
                                 />
                                 <p className="text-xs ml-2">{user.name}</p>
                              </CommandItem>
                           );
                        })}
                     </CommandGroup>
                  </div>
               </CommandList>
            </div>
         )}
      </Command>
   )
}

export default MultiSelect
