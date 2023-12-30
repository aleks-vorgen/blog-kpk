<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ImageController extends Controller
{
    public function store(Request $request) {
        //$this->validate($request, [
        //    'image' => 'required|image|mimes:jpg,png,jpeg|max:2048'
        //]); TODO PASTE IT TO THE ARTICLE CONTROLLER

        $image_path = $request->file('image')->store('image', 'public');

        $data = Image::create([
            'image' => $image_path,
        ]);

        return response()->json($data, 201);
    }
}
