<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;

class RentController extends Controller
{
    public function store(Request $request)
    {
        //
        $rental = new Rental;
        $rental->carId = $request->input('car_id');
        $rental->userId = $request->input('user_id');
        $rental->price = $request->input('price');
        $rental->rental_date = $request->input('rental_date');
        $rental->return_date = $request->input('return_date');
        $rental->save();
        return response()->json($rental);
    }
}
