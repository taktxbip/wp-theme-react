export default class ThemeService {
    // _site = "https://website.com";
    _site = "https://evdesign.ru";
    _apiBase = this._site + "/wp-json";

    _transformHomePage = ({ image, page }) => {
        return {
            id: page.id,
            title: page.title.rendered,
            content: this.removeTags(page.content.rendered),
            featuredUrl: image.source_url,
            featuredAlt: image.alt_text,
            buttonLabel: page.acf.button_label,
            buttonLink: page.acf.button_link
        };
    };

    getPageBySlug = async (slug) => {
        const pageSrc = await this.getResource(`/wp/v2/pages?slug=${slug}`);
        const mediaSrc = await this.getMedia(pageSrc[0].featured_media);
        return this._transformPage(pageSrc, mediaSrc);
    }


    getHomePage = async () => {
        const page = await this.getResource(`/wp/v2/pages/6/`);
        const image = await this.getResource(`/wp/v2/media/${page.featured_media}/`);
        return this._transformHomePage({ image, page });
    }


    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error("Could not fetch " + url + ", received " + res.status);
        }
        const body = await res.json();
        return body;
    }

}