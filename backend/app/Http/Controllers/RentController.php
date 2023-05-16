<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\Car;
use Illuminate\Support\Facades\DB;


class RentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'car_id' => 'required|integer',
            'rental_date' => 'required|date',
            'return_date' => 'required|date|after:rental_date',
        ]);


        $rental = new Rental;
        $rental->carId = $request->input('car_id');
        $rental->userId = $request->input('user_id');
        $rental->price = $request->input('price');
        $rental->rental_date = $request->input('rental_date');
        $rental->return_date = $request->input('return_date');

        $rent = Car::findOrFail($request->input('car_id'));
        $rent->availability = false;
        $rent->update();
        $rental->save();

        return response()->json($rental);

    }

    public function carinfo(Request $request, $id)
    {
        $cars = Car::join('rentals', 'cars.id', '=', 'rentals.carId')
            ->where('rentals.userId', $id)
            ->select('cars.*',
                DB::raw('DATEDIFF(rentals.return_date, rentals.rental_date) AS rent_duration'), 'rentals.return_date')
            ->get();

        return response()->json($cars);
    }


    function rentend($id)
    {
        $car = Rental::where('carId', $id);
        $car->delete();
        $rent = Car::findOrFail($id);
        $rent->availability = true;
        $rent->update();

        return response([
            "success" => "Data Deleted Successfully"
        ]);
    }
    public function userinfo (Request $request){
        $cars = Car::join('rentals', 'cars.id', '=', 'rentals.carId')
            ->join('users', 'rentals.userId', '=', 'users.id')
            ->where('cars.availability', 0)
            ->select('cars.*',
                DB::raw('DATEDIFF(rentals.return_date, rentals.rental_date) AS rent_duration'),
                'users.name as user_name', 'rentals.return_date')
            ->get();

        return response()->json($cars);

    }
}
