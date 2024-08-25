import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { getMessageFromCode } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { toast } from 'sonner'

interface Project {
  id: string
  name: string
}
const fetchProjects = async () => {
  const response = await fetch('/api/projects/fetch', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }

  const data = await response.json()
  console.log('data', data)
  return data.projects
}

export function ProjectsDropdown({
  selectedProject,
  onProjectChange
}: {
  selectedProject: any
  onProjectChange: any
}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    fetchProjects()
      .then(projects => setProjects(projects))
      .catch(error => {
        console.error(error)
        toast.error(error.response.data.detail)
      })
  }, [])

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedProject ? selectedProject.name : 'Select project...'}
            {/* Add an icon here if necessary */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search project..." className="h-9" />
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup>
                {projects.map(project => (
                  <CommandItem
                    key={project.id}
                    value={project.id}
                    onSelect={() => {
                      onProjectChange(project)
                      setOpen(false)
                    }}
                  >
                    {project.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
