import React, { useState } from 'react';
import ReactQuill from 'react-quill';  // Import ReactQuill
import 'react-quill/dist/quill.snow.css';  // Import CSS Quill
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import Chirp from '@/Components/Chirp';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    const handleEditorChange = (value) => {
        setData('message', value);
    };


    // Kustomisasi toolbar dan modul Quill
    const modules = {
        toolbar: [
            [{ 'header': '1'}, { 'header': '2' }, { 'font': [] }],  // Pilihan header dan font
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],           // Pilihan list
            ['bold', 'italic', 'underline'],                        // Tombol format teks
            [{ 'align': [] }],                                      // Pilihan alignment
            ['image']                                               // Tombol untuk menambahkan gambar
        ]
    };
    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* Mengganti textarea dengan ReactQuill dan menambahkan kustomisasi */}
                    <ReactQuill
                        value={data.message}
                        onChange={handleEditorChange}
                        placeholder="What's on your mind?"
                        theme="snow"  // Menggunakan tema snow
                        modules={modules}  // Menambahkan kustomisasi toolbar
                        className='bg-white'
                    />
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
