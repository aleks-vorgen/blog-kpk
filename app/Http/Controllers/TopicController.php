<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::all();

        return response()->json(['data' => $topics]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $topic = Topic::create([
            'name' => $request->name
        ]);

        return response()->json(['success' => true, 'data' => $topic], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $topic = Topic::where('id', $id)->first();

        if(!$topic) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json(['data' => $topic]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $topic = Topic::where('id', $id)->first();
        $topic->name = $request->name;
        $topic->save();

        return response()->json([
            'success' => true,
            'data' => $topic
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id) {
        $topic = Topic::where('id', $id)->first();
        Topic::destroy($id);

        return response()->json([
            'message' => 'Topic \'' . $topic->name . '\' has been deleted'
        ]);
    }
}
