import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { postEmployee, putEmployee } from "../lib/helpers";
import { setEditing, toggleForm } from "../redux/employeeSlice";

function Form() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [inputs, setInputs] = useState({});

  const editingEmployee = useSelector((state) => state.employee.editing)

  useEffect(() => {
    setInputs(editingEmployee)
    // console.log(editingEmployee?.name)
  }, [editingEmployee])


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }


  const postMutation = useMutation({
    mutationFn: (data) => postEmployee(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      setInputs([])

      dispatch(toggleForm())

    },
  })

  const putMutation = useMutation({
    mutationFn: ([employeeId, updatedData]) => putEmployee(employeeId, updatedData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      // setInputs([])
      dispatch(setEditing(null))

    },
  })



  const handleSubmit = async (event) => {
    event.preventDefault()


    if (!editingEmployee) {

      const adjustedInputs = {
        ...inputs,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
      }
      console.log(adjustedInputs)

      postMutation.mutate(adjustedInputs)
    } else {
      const employeeId = inputs._id
      console.log(inputs);
      putMutation.mutate([employeeId, inputs])
    }

  }


  const handleCancel = (e) => {
    e.preventDefault()
    dispatch(setEditing(null))
  }


  return (
    <form className=" h-[150px] w-[60vw] space-x-2 space-y-2 bg-gray-100 flex flex-col 2xl:w-[40vw] 3xl:w-[30vw] p-3 rounded-lg ">
      <div className="space-y-2 ">
        <div className=" space-x-2  flex ">

          <input className=" px-1 w-[18vw] flex-1" type="text" placeholder="name" id="name" name="name" value={inputs?.name || ""} onChange={handleChange} />
          <input className=" px-1 w-[18vw] flex-1" type="email" placeholder="email" name="email" value={inputs?.email || ""} onChange={handleChange} />
          <input className=" px-1 w-[18vw] flex-1 mr-2" type="number" placeholder="salary" name="salary" value={inputs?.salary || ""} onChange={handleChange} />
        </div>

        <div className=" space-x-2 flex justify-center">

          <input className=" px-1" type="date" placeholder="date" name="date" value={inputs?.date || ""} onChange={handleChange} />
          <span>
            <input className=" mr-1" type="radio" placeholder="active" name="status" value="Active" onChange={handleChange} />
            Active
          </span>
          <span>
            <input className=" mr-1" type="radio" placeholder="inactive" name="status" value="Inactive" onChange={handleChange} />
            Inactive
          </span>
        </div>

      </div>

      <div className=" flex justify-center space-x-3">

        {editingEmployee ? (
          <button type="submit" onClick={handleSubmit} className=" bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-gray-50 border hover:border-yellow-600 hover:text-yellow-600" >
            Edit employee
          </button>
        ) : (
          <button type="submit" onClick={handleSubmit} className=" bg-green-500 text-white px-2 py-1 rounded-md hover:bg-gray-50 border hover:border-green-500 hover:text-green-500" >
            Add employee
          </button>
        )}

        <button onClick={handleCancel} className="bg-gray-100  px-2 py-1 rounded-md hover:bg-gray-200 border hover:border-gray-500 hover:text-gray-500">
          Cancel
        </button>

      </div>
    </form >
  )
}

export default Form


