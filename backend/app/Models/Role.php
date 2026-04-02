<?php

namespace App\Models;

use App\Traits\HasSnowflakeId;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends SpatieRole
{
    use HasFactory , HasSnowflakeId;

    protected $fillable = [
        'id',
        'name',
        'guard_name',
    ];

   
}