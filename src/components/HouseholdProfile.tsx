import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Camera, 
  Heart, 
  Car, 
  Truck, 
  Receipt, 
  Plus,
  Users,
  ArrowLeft,
  Scan,
  Brain,
  MapPin,
  Euro,
  CheckCircle,
  Upload
} from 'lucide-react';

interface HouseholdProfileProps {
  onBack: () => void;
}

const HouseholdProfile: React.FC<HouseholdProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('shopping');
  const [scanningProduct, setScanningProduct] = useState(false);
  const [scannedProducts, setScannedProducts] = useState<any[]>([]);
  const [aiAccuracy, setAiAccuracy] = useState(94);
  
  const [shoppingList, setShoppingList] = useState([
    { id: '1', name: 'Riz basmati', quantity: 2, category: 'Féculents', urgent: false, price: 3.20 },
    { id: '2', name: 'Lait demi-écrémé', quantity: 4, category: 'Produits laitiers', urgent: true, price: 1.15 },
    { id: '3', name: 'Pommes Golden', quantity: 1, category: 'Fruits', urgent: false, price: 2.80 }
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: 'Alimentaire' });

  const carPoolingRates = {
    basePrice: 15,
    perKm: 0.60
  };

  const deliveryRates = {
    basePrice: 40,
    perKm: 0.60
  };

  const simulateProductScan = () => {
    setScanningProduct(true);
    
    setTimeout(() => {
      const mockProducts = [
        { id: '1', name: 'Riz Uncle Ben\'s 1kg', price: 3.45, confidence: 96, category: 'Féculents' },
        { id: '2', name: 'Lait Lactel 1L', price: 1.20, confidence: 98, category: 'Produits laitiers' },
        { id: '3', name: 'Pain de mie Harry\'s', price: 2.10, confidence: 92, category: 'Boulangerie' }
      ];
      
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      setScannedProducts([...scannedProducts, randomProduct]);
      setScanningProduct(false);
      setAiAccuracy(randomProduct.confidence);
    }, 2000);
  };

  const addItem = () => {
    if (newItem.name.trim()) {
      setShoppingList([...shoppingList, {
        id: Date.now().toString(),
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        urgent: false,
        price: 0
      }]);
      setNewItem({ name: '', quantity: 1, category: 'Alimentaire' });
    }
  };

  const tabs = [
    { id: 'shopping', label: 'Liste & Scanner IA', icon: ShoppingCart },
    { id: 'donations', label: 'Mes Dons', icon: Heart },
    { id: 'services', label: 'Services Premium', icon: Car },
    { id: 'receipts', label: 'Reçus Fiscaux', icon: Receipt }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-emerald-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour aux profils
          </button>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="mr-4" size={32} />
              <div>
                <h1 className="text-3xl font-bold">Profil Ménage</h1>
                <p className="text-emerald-100">Scanner IA • Dons solidaires • Services premium</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <Brain className="mr-2" size={20} />
                <span className="text-sm">Précision IA</span>
              </div>
              <div className="text-2xl font-bold">{aiAccuracy}%</div>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-emerald-700/50 backdrop-blur-sm rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-emerald-100 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Scanner IA Produits</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-green-600">
                    <Brain className="mr-2" size={20} />
                    <span className="font-medium">TensorFlow Lite</span>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    50 produits référencés
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center bg-emerald-50">
                  {scanningProduct ? (
                    <div className="space-y-4">
                      <div className="animate-spin mx-auto">
                        <Scan className="text-emerald-600" size={48} />
                      </div>
                      <p className="text-emerald-700 font-medium">Analyse IA en cours...</p>
                      <div className="w-full bg-emerald-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="mx-auto text-emerald-600" size={48} />
                      <h3 className="text-lg font-semibold text-emerald-800">Scanner un produit</h3>
                      <p className="text-emerald-600 mb-4">Reconnaissance automatique avec IA avancée</p>
                      <button 
                        onClick={simulateProductScan}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center mx-auto"
                      >
                        <Camera className="mr-2" size={20} />
                        Activer caméra
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Produits scannés récemment</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {scannedProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <CheckCircle className="text-green-500 mr-2" size={16} />
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600">{product.category}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-green-600 font-medium">
                              Confiance: {product.confidence}%
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{product.price}€</div>
                          <button className="text-emerald-600 text-sm hover:text-emerald-700">
                            Ajouter à ma liste
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Liste de Courses Collaborative</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Ajouter un article</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nom du produit"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                        className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option>Alimentaire</option>
                        <option>Hygiène</option>
                        <option>Maison</option>
                        <option>Bébé</option>
                      </select>
                    </div>
                    <button
                      onClick={addItem}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                    >
                      <Plus className="mr-2" size={20} />
                      Ajouter à la liste
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Articles à acheter</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {shoppingList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium">{item.name}</span>
                            {item.urgent && <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Urgent</span>}
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.category} • Quantité: {item.quantity}
                            {item.price > 0 && <span> • {item.price}€</span>}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Faire un Don Solidaire</h2>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Heart className="text-emerald-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-emerald-800">Nouveau don avec reçu fiscal automatique</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Association bénéficiaire
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option>Restos du Cœur - Marseille</option>
                      <option>Secours Populaire - Aix</option>
                      <option>Banque Alimentaire - Toulon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant du don
                    </label>
                    <div className="relative">
                      <input 
                        type="number"
                        placeholder="50"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-8"
                      />
                      <Euro className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border border-emerald-200">
                  <h4 className="font-medium text-emerald-800 mb-2">Avantage fiscal calculé</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Don de 50€</p>
                      <p className="font-semibold">Réduction: 33€</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coût réel</p>
                      <p className="font-semibold text-emerald-600">17€</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Déduction</p>
                      <p className="font-semibold">66%</p>
                    </div>
                  </div>
                </div>

                <button className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
                  <Receipt className="mr-2" size={20} />
                  Valider le don (reçu auto-généré)
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Dons ce mois</h3>
                <p className="text-3xl font-bold text-emerald-600">127 €</p>
                <p className="text-sm text-emerald-600">15 familles aidées</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Total 2024</h3>
                <p className="text-3xl font-bold text-blue-600">1,245 €</p>
                <p className="text-sm text-blue-600">Économie d'impôt: 831 €</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Impact</h3>
                <p className="text-3xl font-bold text-purple-600">89</p>
                <p className="text-sm text-purple-600">Familles aidées</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Services Premium</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                  <div className="flex items-center mb-4">
                    <Car className="text-blue-600 mr-3" size={32} />
                    <h3 className="text-xl font-semibold">Covoiturage Solidaire</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Tarification</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Prix de base:</span>
                          <span className="font-semibold">{carPoolingRates.basePrice}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prix par km:</span>
                          <span className="font-semibold">{carPoolingRates.perKm}€</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between">
                          <span>Exemple (20km):</span>
                          <span className="font-semibold text-blue-600">
                            {carPoolingRates.basePrice + (20 * carPoolingRates.perKm)}€
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <MapPin className="mr-2" size={20} />
                      Proposer un trajet
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      Rechercher un covoiturage
                    </button>
                  </div>
                </div>

                <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
                  <div className="flex items-center mb-4">
                    <Truck className="text-orange-600 mr-3" size={32} />
                    <h3 className="text-xl font-semibold">Livraison à Domicile</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Tarification</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Prix de base:</span>
                          <span className="font-semibold">{deliveryRates.basePrice}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prix par km:</span>
                          <span className="font-semibold">{deliveryRates.perKm}€</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between">
                          <span>Exemple (15km):</span>
                          <span className="font-semibold text-orange-600">
                            {deliveryRates.basePrice + (15 * deliveryRates.perKm)}€
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                      <Truck className="mr-2" size={20} />
                      Programmer une livraison
                    </button>
                    <button className="w-full border border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                      Devenir livreur bénévole
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Mes Services Actifs</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Car className="text-blue-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium">Covoiturage vers Carrefour Marseille</p>
                      <p className="text-sm text-gray-600">Demain 14h30 • 3 places disponibles • 27€</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Actif</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center">
                    <Truck className="text-orange-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium">Livraison programmée - Famille Martin</p>
                      <p className="text-sm text-gray-600">Vendredi 16h • 12km • 49€</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">Programmé</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'receipts' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Reçus Fiscaux Automatiques</h2>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Receipt className="text-emerald-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-emerald-800">Récapitulatif fiscal 2024</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-emerald-600">Total des dons</p>
                  <p className="text-2xl font-bold text-emerald-800">1,245 €</p>
                </div>
                <div>
                  <p className="text-sm text-emerald-600">Réduction d'impôt (66%)</p>
                  <p className="text-2xl font-bold text-emerald-800">831 €</p>
                </div>
                <div>
                  <p className="text-sm text-emerald-600">Coût réel</p>
                  <p className="text-2xl font-bold text-emerald-800">414 €</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-emerald-800">Reçu fiscal global 2024</h4>
                    <p className="text-sm text-emerald-600">Conforme article 200 du CGI</p>
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
                    <Upload className="mr-2" size={16} />
                    Télécharger PDF
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Historique des reçus</h3>
              <div className="space-y-3">
                {[
                  { period: 'Janvier 2024', amount: '245 €', reduction: '164 €', available: true, auto: true },
                  { period: 'Décembre 2023', amount: '189 €', reduction: '126 €', available: true, auto: true },
                  { period: 'Novembre 2023', amount: '156 €', reduction: '104 €', available: true, auto: true }
                ].map((receipt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-medium">{receipt.period}</p>
                        {receipt.auto && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                            Auto-généré
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Don: {receipt.amount} • Réduction: {receipt.reduction}
                      </p>
                    </div>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
                      <Receipt className="mr-2" size={16} />
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseholdProfile;