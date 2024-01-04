<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ImageController extends Controller {

    public static function upload(UploadedFile $file) {
        $image_path = $file->store('image', 'public');

        return $image_path;
    }

    public function download($fileName) {
        $filePath = storage_path('/app/public/image/'.$fileName);
        return response()->file($filePath);
    }

    public static function delete($fileName) {
        if (File::exists(storage_path('/app/public/'.$fileName)))
            File::delete(storage_path('/app/public/'.$fileName));
    }
}
