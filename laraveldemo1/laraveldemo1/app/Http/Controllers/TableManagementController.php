<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Table;
use App\Models\Reservation;
use App\Models\Restaurant;
use Carbon\Carbon;

class TableManagementController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/tables/reservations/{restaurantId}",
     *     summary="View reservation schedule for a restaurant on the current day",
     *     tags={"Table Management"},
     *     @OA\Parameter(
     *         name="restaurantId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="ID of the restaurant"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of reservations for the current day",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Reservation"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid restaurant ID format",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     )
     * )
     */
    public function viewReservationSchedule(Request $request, $restaurantId)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $restaurantId)) {
            return response()->json(['error' => 'Invalid restaurant ID format'], 400);
        }

        try {
            $today = Carbon::today('Europe/Bucharest');
            $reservations = Reservation::where('restaurant_id', $restaurantId)
                ->whereBetween('date', [$today->startOfDay(), $today->endOfDay()])
                ->with(['table', 'user'])
                ->get();

            return response()->json($reservations);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/tables/assign/{reservationId}",
     *     summary="Assign a table to a reservation",
     *     tags={"Table Management"},
     *     @OA\Parameter(
     *         name="reservationId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="ID of the reservation"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="table_id", type="string", description="ID of the table to assign")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Table assigned successfully",
     *         @OA\JsonContent(@OA\Property(property="message", type="string"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid reservation ID format or table not available",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Reservation or table not found",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     )
     * )
     */
    public function assignTable(Request $request, $reservationId)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $reservationId)) {
            return response()->json(['error' => 'Invalid reservation ID format'], 400);
        }

        $request->validate([
            'table_id' => 'required|uuid|exists:tables,id',
        ]);

        try {
            $reservation = Reservation::findOrFail($reservationId);
            $table = Table::findOrFail($request->table_id);

            if (!$table->status) {
                return response()->json(['error' => 'الطاولة غير متاحة'], 400);
            }

            $reservation->table_id = $request->table_id;
            $reservation->save();

            $table->status = false;
            $table->save();

            return response()->json(['message' => 'تم تعيين الطاولة بنجاح']);
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json(['error' => 'الحجز أو الطاولة غير موجودة'], 404);
            }
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/tables/status/{tableId}",
     *     summary="Update the status of a table",
     *     tags={"Table Management"},
     *     @OA\Parameter(
     *         name="tableId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="ID of the table"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="New status of the table")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Table status updated successfully",
     *         @OA\JsonContent(@OA\Property(property="message", type="string"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid table ID format",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Table not found",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     )
     * )
     */
    public function updateTableStatus(Request $request, $tableId)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $tableId)) {
            return response()->json(['error' => 'Invalid table ID format'], 400);
        }

        $request->validate([
            'status' => 'required|boolean',
        ]);

        try {
            $table = Table::findOrFail($tableId);
            $table->status = $request->status;
            $table->save();

            $status = $request->status ? 'متاحة' : 'محجوزة';
            return response()->json(['message' => "تم تحديث حالة الطاولة إلى: $status"]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/tables/reservations/{reservationId}",
     *     summary="Delete a specific reservation",
     *     tags={"Table Management"},
     *     @OA\Parameter(
     *         name="reservationId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="ID of the reservation to delete"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reservation deleted successfully",
     *         @OA\JsonContent(@OA\Property(property="message", type="string"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid reservation ID format",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Reservation not found",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     )
     * )
     */
    public function deleteReservation($reservationId)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $reservationId)) {
            return response()->json(['error' => 'Invalid reservation ID format'], 400);
        }

        try {
            $reservation = Reservation::findOrFail($reservationId);

            if ($reservation->table_id) {
                $table = Table::find($reservation->table_id);
                if ($table) {
                    $table->status = true;
                    $table->save();
                }
            }

            $reservation->delete();

            return response()->json(['message' => 'تم حذف الحجز بنجاح']);
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json(['error' => 'الحجز غير موجود'], 404);
            }
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}