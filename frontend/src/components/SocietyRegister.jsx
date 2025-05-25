import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import axios from "axios";

export default function SocietyRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FormSubmitHandler = (formData) => {
    const payload = {
      ...formData,
      residents: Number(formData.residents),
    };
    console.log(payload);
    const id = toast.loading("Adding society..");
    axios
      .post("https://waste-x-gamma.vercel.app/society/new", payload)
      .then(() => {
        toast.update(id, {
          render: "Society Registered!",
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render: "Some error occurred!",
          type: "error",
          isLoading: false,
        });
      });
  };

  return (
    <div className="form-parent">
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          Register your society
        </Text>
        <Text as="i" fontSize="1vmax">
          Enter the following details!
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Name
          </FormLabel>
          <Input
            type="text"
            borderColor="#D0D5FA"
            backgroundColor="ivory"
            {...register("name", {
              required: "name is required",
            })}
          />
          <p className="err">{errors.name?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Location
          </FormLabel>
          <Input
            type="text"
            borderColor="#D0D5FA"
            backgroundColor="ivory"
            {...register("location", {
              required: "location is required",
            })}
          />
          <p className="err">{errors.location?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            No of residents
          </FormLabel>
          <Input
            type="number"
            borderColor="#D0D5FA"
            backgroundColor="ivory"
            {...register("residents", {
              required: "no of residents is required",
            })}
          />
          <p className="err">{errors.residents?.message}</p>
        </FormControl>
        <Button type="submit" colorScheme="green">
          Submit
        </Button>
      </form>
    </div>
  );
}
