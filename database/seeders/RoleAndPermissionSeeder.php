<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
{
    // Creating roles
    $roleAdmin = Role::create(['name' => 'admin']);
    $roleSuperAdmin = Role::create(['name' => 'super-admin']);

    // Creating permissions
    $permissions = ['manage orders', 'process refunds', 'edit users'];
    foreach ($permissions as $perm) {
        Permission::create(['name' => $perm]);
    }

    // Assign all permissions to the Super Admin role
    $roleSuperAdmin->givePermissionTo(Permission::all());
    // Assign a subset of permissions to the Admin role
    $roleAdmin->givePermissionTo(['manage orders', 'edit users']);
}
}
