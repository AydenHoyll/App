import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {nSampleValues} from "./utils";
import axios from "axios";

const UserForm = () => {
    const { handleSubmit, control } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const dataToSend = {
            nSamples: data.nSamples,
            prompt: data.prompt,
        }

        axios.get('http://127.0.0.1:5000/api/data', { params: dataToSend })
            .then(response => {
                console.log(response.data);
                // Handle the response data
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error
            });
    };


    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size={"middle"}>
            <Form.Item label="nSamples" >
                <Controller
                    name="nSamples"
                    control={control}
                    defaultValue=""
                    rules={{required: {value: true, message: 'enter a number of samples'}}
                    }
                    render={({ field }) => <Select size="medium" options={nSampleValues} {...field} />}
                />
            </Form.Item>
            <Form.Item label="Prompt">
                <Controller
                    name="Prompt"
                    control={control}
                    rules={{required: true}
                    }
                    defaultValue=""
                    render={({ field }) => <TextArea placeholder="Enter your prompt here..." {...field} />}
                />
            </Form.Item>



            <Form.Item>
                <button
                    type='submit'
                    className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-2">Submit</button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;
