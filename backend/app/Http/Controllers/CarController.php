<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{

    public function index()
    {
        //
        $cars = Car::all();
        return response()->json($cars);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'brand_name' => 'required|string',
            'model' => 'required|string',
            'price_per_day' => 'required|numeric|min:1',
            'fuel_type' => 'required|string',
            'gearbox' => 'required|string',
            'availability' => 'nullable|boolean'
        ]);
        $car = new Car;
//        $car->photo = $request->file('photo')->store('photo');
        $car->brand_name = $request->input('brand_name');
        $car->model = $request->input('model');
        $car->price_per_day = $request->input('price_per_day');
        $car->fuel_type = $request->input('fuel_type');
        $car->gearbox = $request->input('gearbox');
        $car->availability = $request->input('availability');

        if ($request->hasFile('photo')) {
            $filename = $request->file('photo')->getClientOriginalName();
            $request->file('photo')->storeAs('public/photos', $filename);
            $car->photo = $filename;
        }
        $car->save();
        return response()->json($car);
    }


    public function show(Car $car)
    {
        //
        return response()->json($car);
    }


    public function update(Request $request, $id)
    {
        $car = Car::findOrFail($id);//throws an exception if the car is not found

        $validatedData = $request->validate([
            'brand_name' => 'required|string',
            'model' => 'required|string',
            'price_per_day' => 'required|numeric|min:1',
            'fuel_type' => 'required|string',
            'gearbox' => 'required|string',
            'availability' => 'nullable|boolean'
        ]);

        $car->brand_name = $validatedData['brand_name'];
        $car->model = $validatedData['model'];
        $car->price_per_day = $validatedData['price_per_day'];
        $car->fuel_type = $validatedData['fuel_type'];
        $car->gearbox = $validatedData['gearbox'];
        $car->availability = $request->has('availability');

        if ($request->hasFile('photo')) {
            $filename = $request->file('photo')->getClientOriginalName();
            $request->file('photo')->storeAs('public/photos', $filename);
            $car->photo = $filename;
        }

        $car->update();

        return response()->json([
            'message' => 'Car updated successfully',
            'data' => $car
        ]);
    }

    public function edit(Car $id)
    {
        $car = Car::findOrFail($id->id);
        return response()->json($car);
    }

    public function destroy(Car $id)
    {
        //
        $id->delete();
        return response([
            "success" => "Data Deleted Successfully",
            "msg" => "hello"
        ]);
    }
}
