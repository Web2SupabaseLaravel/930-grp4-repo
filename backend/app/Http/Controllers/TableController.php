<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Table;
use Illuminate\Support\Str;

class TableController extends Controller
{
   /**
 * @OA\Get(
 *     path="/tables",
 *     summary="Get list of tables",
 *     tags={"Tables"},
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Table"))
 *     )
 * )
 */
public function index()
{
    try {
        $tables = Table::all();
        return response()->json($tables);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
} 

    /**
     * @OA\Post(
     *     path="/api/tables",
     *     summary="Create a new table",
     *     tags={"Table Management"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="restaurant_id", type="string", description="UUID of the restaurant"),
     *             @OA\Property(property="size", type="integer", description="Size of the table"),
     *             @OA\Property(property="status", type="boolean", description="Availability of the table"),
     *             @OA\Property(property="location", type="string", description="Location of the table"),
     *             @OA\Property(property="table_number", type="integer", description="Table number")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Table created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="data", ref="#/components/schemas/Table")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(@OA\Property(property="message", type="string"), @OA\Property(property="errors", type="object"))
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|uuid|exists:restaurants,id',
            'size' => 'required|integer',
            'status' => 'required|boolean',
            'location' => 'required|string',
            'table_number' => 'required|integer',
        ]);

        try {
            $validated['id'] = (string) Str::uuid();
            $table = Table::create($validated);
            return response()->json(['message' => 'تم إنشاء الطاولة بنجاح', 'data' => $table], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/tables/{tableId}",
     *     summary="Get a specific table",
     *     tags={"Table Management"},
     *     @OA\Parameter(
     *         name="tableId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="ID of the table"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Table details",
     *         @OA\JsonContent(ref="#/components/schemas/Table")
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
     *     )
     * )
     */
    public function show($id)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $id)) {
            return response()->json(['error' => 'Invalid table ID format'], 400);
        }

        try {
            $table = Table::findOrFail($id);
            return response()->json($table);
        } catch (\Exception $e) {
            return response()->json(['error' => 'الطاولة غير موجودة'], 404);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/tables/{tableId}",
     *     summary="Update a specific table",
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
     *             @OA\Property(property="restaurant_id", type="string", description="UUID of the restaurant"),
     *             @OA\Property(property="size", type="integer", description="Size of the table"),
     *             @OA\Property(property="status", type="boolean", description="Availability of the table"),
     *             @OA\Property(property="location", type="string", description="Location of the table"),
     *             @OA\Property(property="table_number", type="integer", description="Table number")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Table updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="data", ref="#/components/schemas/Table")
     *         )
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
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(@OA\Property(property="message", type="string"), @OA\Property(property="errors", type="object"))
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(@OA\Property(property="error", type="string"))
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $id)) {
            return response()->json(['error' => 'Invalid table ID format'], 400);
        }

        $validated = $request->validate([
            'restaurant_id' => 'sometimes|uuid|exists:restaurants,id',
            'size' => 'sometimes|integer',
            'status' => 'sometimes|boolean',
            'location' => 'sometimes|string',
            'table_number' => 'sometimes|integer',
        ]);

        try {
            $table = Table::findOrFail($id);
            $table->update($validated);
            return response()->json(['message' => 'تم تحديث الطاولة بنجاح', 'data' => $table]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/tables/{tableId}",
     *     summary="Delete a specific table",
     *     tags={"Table Management"},
     *     @OA\Parameter(
     *         name="tableId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="ID of the table to delete"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Table deleted successfully",
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
    public function destroy($id)
    {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $id)) {
            return response()->json(['error' => 'Invalid table ID format'], 400);
        }

        try {
            $table = Table::findOrFail($id);
            $table->delete();
            return response()->json(['message' => 'تم حذف الطاولة بنجاح']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}