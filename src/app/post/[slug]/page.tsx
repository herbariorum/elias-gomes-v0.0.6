
import Footer from "@/components/Footer";
import PostContent from "@/components/PostContent";


interface Props {
    params: {
        slug: string;
    }
}

export default async function DetailPost({ params }: Props) {
    
    const  {slug}  = await params;
    // const session = await getSession();
    // const userId = session?.user?.id;
    const userId = 1;
    
    return (
        <>
            <div className="bg-white">
                <a href="/" className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500  bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>
                    <span className="w-full">Volta ao início</span>
                </a>
            </div>

            <PostContent slug={slug} userId={userId} />


            <Footer />
        </>

    );

}