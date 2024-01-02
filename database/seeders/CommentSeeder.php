<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::create([
            'text' => 'TestComment1',
            'user_id' => '1',
            'article_id' => '1'
        ]);
        Comment::create([
            'text' => 'TestComment2',
            'user_id' => '2',
            'article_id' => '1'
        ]);
        Comment::create([
            'text' => 'TestComment3',
            'user_id' => '1',
            'article_id' => '2'
        ]);
        Comment::create([
            'text' => 'TestComment4',
            'user_id' => '2',
            'article_id' => '2'
        ]);
    }
}
