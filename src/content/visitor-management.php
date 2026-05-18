<?php

// visitor-management.php · Sistema de Gestión de Visitas
// Repo: https://github.com/JustSidus/gestion-visitas-demo

namespace Portafolio\Proyectos;

readonly class VisitorManagementSystem
{
    public string $tipo  = 'Sistema Institucional';
    public string $estado = 'Producción';

    public array $stack = [
        'backend'  => ['Laravel 12', 'PHP 8.3', 'tymon/jwt-auth', 'dompdf', 'PhpSpreadsheet'],
        'frontend' => ['Vue 3', 'Vite', 'Tailwind CSS', 'MSAL Browser', 'Chart.js'],
        'cloud'    => ['Microsoft Entra ID', 'Azure App Service', 'Azure Static Web Apps', 'Azure DB for MySQL'],
    ];

    public array $arquitectura = [
        'Patron_Diseno'   => 'SPA desacoplada (Vue 3 + Vite) consumiendo una API RESTful (Laravel 12).',
        'Infraestructura' => 'Backend en Azure App Service; frontend en Azure Static Web Apps; persistencia en Azure Database for MySQL.',
        'Reporteria'      => 'Exportación a PDF (dompdf) y Excel (PhpSpreadsheet) generados en el backend y descargados directamente desde el browser.',
    ];

    public array $seguridadYAcceso = [
        'Identidad'       => 'Delegada a Microsoft Entra ID (OIDC) para cumplir el estándar corporativo de la agencia.',
        'JWT_Desacoplado' => 'El backend no depende del token de Microsoft en cada request. Tras la validación inicial, emite un JWT interno (tymon/jwt-auth) con scope y claims propios.',
        'RBAC'            => 'Control de acceso en 4 roles (Recepcionista, Anfitrión, Guardia, Admin) inyectados en el JWT y verificados por middleware en Laravel y route guards en Vue.',
    ];

    public array $reglasDeNegocio = [
        'Problema_Core' => 'Reemplazar el control manual en libretas físicas que impedía la validación en tiempo real y dejaba sin trazabilidad los registros.',
        'Trazabilidad'  => 'Log de auditoría inmutable generado por cada entrada y salida del edificio.',
        'Operacion'     => 'Validación instantánea para el personal de seguridad, eliminando cuellos de botella en la recepción.',
    ];

    public function obtenerFlujoAuth(): array
    {
        return [
            'Paso_1' => 'Frontend usa MSAL Browser para autenticar al usuario contra Microsoft Entra ID.',
            'Paso_2' => 'Microsoft devuelve un access_token (prueba de identidad corporativa).',
            'Paso_3' => 'Laravel recibe el token y verifica la firma criptográfica contra los JWKS públicos de Entra ID.',
            'Paso_4' => 'Laravel provisiona o sincroniza el usuario en la base de datos interna.',
            'Paso_5' => 'Laravel emite un JWT propio con los claims y roles correspondientes.',
            'Paso_6' => 'Frontend descarta el token de MSAL y usa el JWT interno para todas las peticiones HTTP.',
        ];
    }
}
