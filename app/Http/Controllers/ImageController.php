<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public static function upload($request) {
        $image_path = $request->store('image', 'public');

        return $image_path;
    }

    public function download($fileName) {
        $path = url('image/'.$fileName);
        $filePath = storage_path('/app/public/image/'.$fileName);
        return response()->file($filePath);
    }
}
