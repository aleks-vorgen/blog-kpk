<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::all();

        return response()->json(['data' => $comments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|min:5|max:255',
            'article_id' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $comment = Comment::create([
            'text' => $request->text,
            'article_id' => $request->article_id,
            'user_id' => $request->user_id
        ]);

        return response()->json(['success' => true, 'data' => $comment], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comment = Comment::where('id', $id)->first();

        if(!$comment) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json(['data' => $comment]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|min:5|max:255',
            'article_id' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $comment = Comment::where('id', $id)->first();
        $comment->text = $request->text;
        $comment->article_id = $request->article_id;
        $comment->user_id = $request->user_id;
        $comment->save();

        return response()->json([
            'success' => true,
            'data' => $comment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        Comment::destroy($id);

        return response()->json([
            'message' => 'Comment has been deleted'
        ]);
    }
}
