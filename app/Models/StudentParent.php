<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class StudentParent extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'firstname',
        'lastname',
        'date_of_birth',
        'last_login_date',
        'gender',
        'email',
        'password',
        'phone',
        'address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'last_login_date',
    ];

    /* hna zadna had casts bach nraddo lforma dial date b7al li drna hit mnin kona tanbghiw ndiro update 
    date kan tayji mn BD avec h:m:s w mataytaffichach lina f input date alors hadi ghat7al lmochkil */
    protected $casts = [
        'date_of_birth' => 'date:Y-m-d',
    ];

    protected $appends = ['role'];

    public function getRoleAttribute() {
        return 'parent';
    }
}
