import React from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className='flex flex-col items-center py-10'>
              <img src={'/loader.gif'} width={100} height={100}></img>
              <h2> Please wait...Ai Working on your course... </h2>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LoadingDialog
