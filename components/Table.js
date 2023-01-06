import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteEmployee, getAllEmployees } from '../lib/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setEditing, toggleDelete } from '../redux/employeeSlice';

function Table() {

  const dispatch = useDispatch()

  const { isLoading, error, data } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getAllEmployees()
  })

  const searchData = useSelector((state) => state.employee.searchData)
  const editPendingId = useSelector((state) => state.employee.editing?._id)
  const deletePendingId = useSelector((state) => state.employee.deletePending)


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const handleDelete = (id) => {
    console.log(id)
    dispatch(toggleDelete(id))
  }


  const handleEdit = (data) => {
    console.log(data)
    dispatch(setEditing(data))
  }


  return (
    <div className=" w-full px-7 h-[50vh] lg:h-[55vh] 2xl:h-[65vh] 2xl:w-[70vw] 3xl:h-[75vh] 3xl:w-[50vw] overflow-y-scroll shadow-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 ">
      <table className='w-full'>
        <thead className=" space-x-5  ">
          <tr className='bg-gray-600 text-white sticky top-0 left-0 right-0'>
            <th className='py-2'>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className=" text-center pt-10" >
          {searchData ?
            searchData.map(row => (
              <tr key={row._id} className={`${deletePendingId == row._id ? "bg-red-400" : editPendingId == row._id ? "bg-yellow-400" : "bg-gray-100"} `}>
                <td className=' py-2'>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.salary}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
                <td className=' space-x-2'>
                  <EditIcon
                    onClick={() => handleEdit(row)}
                    className=' text-gray-400 cursor-pointer hover:text-green-400'
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(row._id)}
                    className=' text-gray-400 cursor-pointer hover:text-red-400'
                  />
                </td>
              </tr>
            ))
            :
            data && data.map(row => (
              <tr key={row._id} className={`${deletePendingId == row._id ? "bg-red-400" : editPendingId == row._id ? "bg-yellow-400" : "bg-gray-100"} `}>
                <td className=' py-2'>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.salary}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
                <td className=' space-x-2'>
                  <EditIcon
                    onClick={() => handleEdit(row)}
                    className=' text-gray-400 cursor-pointer hover:text-green-400'
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(row._id)}
                    className=' text-gray-400 cursor-pointer hover:text-red-400'
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table