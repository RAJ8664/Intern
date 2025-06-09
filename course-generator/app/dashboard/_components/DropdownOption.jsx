import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { CourseList } from '@/configs/schema'
import {
  AlertDialogHeader,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

function DropdownOption({ children, handleOnDelete }) {
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenAlert(true)}>
            <div className='flex items-center gap-1'>
              {' '}
              <HiOutlineTrash /> Delete{' '}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Are you sure? </AlertDialogTitle>
            <AlertDialogDescription>
              {' '}
              This will delete the course.{' '}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              {' '}
              Cancel{' '}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleOnDelete()
                setOpenAlert(false)
              }}
            >
              {' '}
              Continue{' '}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DropdownOption
