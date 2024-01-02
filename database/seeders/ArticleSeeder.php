<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::create([
            "title" => "testtitle1",
            "description" => "testdescription1",
            "image" => "testimage1",
            "tag" => "testteg1",
            "topic_id" => 1,
            "user_id" => 1,
        ]);
        Article::create([
            "title" => "testtitle2",
            "description" => "testdescription2",
            "image" => "testimage2",
            "tag" => "testteg2",
            "topic_id" => 2,
            "user_id" => 2,
        ]);
    }
}
