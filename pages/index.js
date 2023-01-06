import Head from 'next/head'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../components/Form'
import Table from '../components/Table'
import { deleteEmployee, searchEmployees } from '../lib/helpers'
import { setSearchData, toggleDelete, toggleForm } from '../redux/employeeSlice'


export default function Home() {

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const formState = useSelector(state => state.employee.formOpen)
  const deletePending = useSelector(state => state.employee.deletePending)

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      dispatch(toggleDelete())
    },
  })


  const searchMutation = useMutation({
    mutationFn: (term) => searchEmployees(term),
    onSuccess: (searchData) => {
      if (searchData?.length > 0) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['employees'] })
        console.log('searchData ' + searchData);
        dispatch(setSearchData(searchData))
      } else {
        console.log("searchSearchData null")
        dispatch(setSearchData(null))
      }
    },
  })


  const handleAddEmployee = () => {
    dispatch(toggleForm())
  }

  const handleConfirmDelete = () => {
    console.log(deletePending);
    const deleteId = deletePending

    deleteMutation.mutate(deleteId)
  }

  const handleCancelDelete = () => {
    dispatch(toggleDelete())
  }

  const searchEmployee = async (term) => {
    // const searchData = await searchMutation.mutate(term)
    if (term) {
      searchMutation.mutate(term)
    } else {
      console.log("no term")
      dispatch(setSearchData(null))
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center flex-col items-center space-y-3 px-11 pb-10 box-border ">
        <h1 className='text-2xl font-bold mt-3'>
          Employee List
        </h1>

        {/* form */}
        {deletePending ? (
          <div className='h-[150px] w-[60vw] space-x-2 bg-gray-100 flex items-center justify-center 2xl:w-[40vw] 3xl:w-[30vw] p-1 rounded-lg '>
            <button
              onClick={handleConfirmDelete}
              className=" bg-red-500 text-white px-2 py-1 rounded-md hover:bg-gray-50 border hover:border-red-500 hover:text-red-500"
            >
              Delete
            </button>

            <button
              onClick={handleCancelDelete}
              className="bg-gray-100  px-2 py-1 rounded-md hover:bg-gray-200 border hover:border-gray-500 hover:text-gray-500"            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            {formState ? (
              <Form />
            ) : (
              <div className='h-[150px] w-[60vw] space-x-2 space-y-2 bg-gray-100 flex items-center justify-center 2xl:w-[40vw] 3xl:w-[30vw] p-1 rounded-lg'>
                <button onClick={handleAddEmployee}
                  className=" bg-green-500 text-white px-2 py-1 rounded-md hover:bg-gray-50 border hover:border-green-500 hover:text-green-500"
                >
                  Add employee
                </button>
              </div>
            )}
          </div>
        )}

        <input onChange={(e) => searchEmployee(e.target.value)} type="text" placeholder='Search employee' className=' p-1 px-2 bg-gray-100 rounded-md outline-none border border-gray-500' />

        {/* tables */}
        <Table />
      </main>
    </>
  )
}
