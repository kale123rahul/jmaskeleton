import * as Jma from '../interfaces/all-interfaces';
import * as Chance from 'chance';
import * as moment from 'moment';


export class MockService {

    private chance = new Chance();
    private id() {
        return chance.hash({ length: 8 });
    }

    mockProviders(count: number): Jma.IMediaProvider[] {
        var result: Jma.IMediaProvider[] = [];
        while (result.length < count) {
            result.push(<Jma.IMediaProvider>{
                id: this.id(),
                name: chance.name(),
                contactInfo: {
                    phone: chance.phone(),
                    email: chance.email(),
                    address: chance.address()
                }
            })
        }
        return result;
    }

    private images = [
        "https://cdn.pixabay.com/photo/2014/12/22/19/59/macbook-577758__340.jpg",
        "https://cdn.pixabay.com/photo/2014/10/23/20/51/iphone-500291__340.jpg",
        "https://cdn.pixabay.com/photo/2016/10/13/16/20/ecommerce-1738156__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/10/01/21/girl-1813281__340.jpg",
        "https://cdn.pixabay.com/photo/2016/10/13/16/23/genoa-1738159__340.jpg",
        "https://cdn.pixabay.com/photo/2015/09/22/15/59/backstage-951953__340.jpg",
        "https://cdn.pixabay.com/photo/2015/07/11/23/00/coffee-841425__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/23/22/36/still-life-2338824__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/20/20/22/clouds-2329680__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/17/12/42/tiger-2320819__340.jpg"
    ]

    mockMediaContainers(providerId: string, count: number): Jma.IMediaContainer[] {
        var result = [];
        if (count <= 0) count = chance.integer({ min: 5, max: 20 });
        while (result.length < count) {
            let fromDate = moment().add(chance.integer({ min: -20, max: -5 }), 'days').toDate();
            let toDate = moment(fromDate).add(chance.integer({ min: 5, max: 20 }), 'days').toDate();
            result.push(<Jma.IMediaContainer>{
                id: this.id(),
                providerId: providerId,
                title: chance.sentence(),
                description: chance.paragraph(),
                validFrom: fromDate,
                validTo: toDate,
                location: {
                    lat: chance.latitude({ min: 51, max: 53 }),
                    long: chance.longitude({ min: 4.3, max: 4.4 }),
                },
                media: this.mockMedia(chance.integer({ min: 1, max: 3 }))
            })
        }
        return result;
    }


    mockMedia(count: number): Jma.IMediaObject[] {
        var result: Jma.IMediaObject[] = [];
        while (result.length < count) {
            result.push(<Jma.IMediaObject>{
                id: this.id(),
                altText: chance.sentence(),
                url: chance.pick(this.images)
            })
        }
        return result;
    }
}