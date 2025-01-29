export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">404 - Página não encontrada</h1>
            <p className="text-gray-600">O post que você está procurando não existe.</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">Voltar para a página inicial</a>
        </div>
    );
}