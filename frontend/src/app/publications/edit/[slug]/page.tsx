import NewPublicationView from "@/views/NewPublication";
import { publicacoes } from "@/data/publicacoes";

export function generateStaticParams() {
    return publicacoes.map((item) => ({ slug: item.slug }));
}

export default async function EditPublicationPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <NewPublicationView editSlug={slug} />;
}
